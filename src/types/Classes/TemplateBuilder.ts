import { Vue, Component, Prop } from 'nuxt-property-decorator'
import { VNode, VNodeData } from 'vue'
import { ComponentDetails } from '../interfaces'

/**
 * Base class for components that renders content from a JSON file
 * @author Carl Jeremy Omandam <carl@simplexi.com.ph>
 * @author John Alene Pacheco <john12@simplexi.com.ph>
 * @since 2019.10.07
 */
@Component
export default class TemplateBuilder extends Vue {
  /**
   * Binds the Vue instance to translation method
   */
  readonly $t: any = this.$t.bind(this)

  /**
   * Error message to be displayed if template is not provided
   */
  readonly TEMPLATE_NOT_INITIALIZED: string = 'Template not initialized.'

  /**
   * Special tokens used for processing components
   */
  readonly TOKEN: { [x: string]: string } = {
    data: '::',
    translate: 't:',
    variable: '~',
    negate: '!',
    function: 'f:'
  }

  /**
   * Page template in JSON format
   */
  @Prop({ type: Object, default: (): object => ({}) }) template!: {
    dataUI: ComponentDetails
    variables: object
  }

  /**
   * Template data source
   */
  @Prop({ type: Object, default: (): object => ({}) }) dataSource!: {
    [x: string]: any
  }

  /**
   * Object that holds variable defined in JSON template
   */
  pageVars: { [x: string]: any } = {}

  /**
   * List of event handlers
   */
  eventHandlers: { [x: string]: Function } = {}

  /**
   * Created hook, used to set page variables before the component is rendered
   *
   * @returns void
   */
  created (): void {
    this.setPageVars()
  }

  /**
   * Component render function
   *
   * @param createElement
   * @returns VNode
   */
  render (createElement: Function): VNode {
    if (this.template === null || this.template === undefined) {
      throw new Error(this.TEMPLATE_NOT_INITIALIZED)
    }
    const componentData = JSON.parse(JSON.stringify(this.template.dataUI))

    return this.buildComponent(createElement, componentData, this.dataSource)
  }

  /**
   * Creates page variables declared in template
   *
   * @returns void
   */
  setPageVars (): void {
    if (this.isset(this.template.variables)) {
      const keys = Object.keys(this.template.variables)
      keys.forEach((key): void => {
        this.$set(this.pageVars, key, this.template.variables[key])
      })
    }
  }

  /**
   * Builds the page components
   *
   * @param createElement
   * @param component
   * @param dataSource
   * @returns VNode
   */
  buildComponent (
    createElement: Function,
    component: ComponentDetails,
    dataSource: any
  ): VNode {
    const subComponents: VNode[] = []
    const properties: VNodeData = component.properties

    if (this.isset(component.subcomponents)) {
      component.subcomponents.forEach(
        (subComponent: ComponentDetails): void => {
          const src: any = this.isset(subComponent.data)
            ? dataSource[<string>subComponent.data]
            : dataSource

          if (Array.isArray(src)) {
            src.forEach((data: any): void => {
              const componentClone = JSON.parse(JSON.stringify(subComponent))
              delete componentClone.data
              subComponents.push(
                this.buildComponent(createElement, componentClone, data)
              )
            })
          } else {
            subComponents.push(
              this.buildComponent(createElement, subComponent, src)
            )
          }
        }
      )
    }

    this.processComponentProps(component.properties, dataSource)
    this.attachEventHandlers(component)

    if (component.properties.scopedSlots) {
      this.resolveScopedSlot(component.properties.scopedSlots, createElement, dataSource)
    }

    return createElement(component.component, properties, subComponents)
  }

  /**
   * Applies the proper values of component properties based on token
   *
   * @param properties
   * @param dataSource
   * @returns void
   */
  processComponentProps (properties: any, dataSource: any): void {
    if (!this.isset(properties)) {
      return
    }
    
    const keys: string[] = Object.keys(properties)

    keys.forEach((key: string): void => {
      let property: any = properties[key]
      if (typeof property === 'object') {
        this.processComponentProps(property, dataSource)
      } else if (typeof property === 'string') {
        property = this.translateProperty(property)
        property = this.resolveData(property, dataSource)
        property = this.resolveVariables(property)
        property = this.resolveFunction(property)
        properties[key] = property
      }
    })
  }

  /**
   * Replaces the property with actual data if the token exists
   *
   * @param property
   * @param dataSource
   * @returns any
   */
  resolveData (property: string, dataSource: any): any {
    if (property.indexOf(this.TOKEN.data) === 0 && this.isset(dataSource)) {
      return dataSource[property.replace(this.TOKEN.data, '')]
    }

    return property
  }

  /**
   * Binds the property to a variable if the token exists
   *
   * @param property
   * @returns any
   */
  resolveVariables (property: string): any {
    if (property && property.indexOf(this.TOKEN.variable) === 0) {
      let path: string = property.replace(this.TOKEN.variable, '')
      const negate: boolean = path.indexOf(this.TOKEN.negate) === 0
      path = path.replace(this.TOKEN.negate, '')
      const val: any = this.getTargetVariable(path, this.pageVars)

      return negate ? !val : val
    }

    return property
  }

  /**
   * Assign a function to the property
   *
   * @param property
   * @returns any
   */
  resolveFunction (property: string): any {
    if (typeof property === 'string' && property.length > 0 && property.indexOf(this.TOKEN.function) === 0) {
      const funntionName: string = property.replace(this.TOKEN.function, '')

      return this[funntionName]
    }

    return property
  }

  /**
   * Process scoped slot property
   * 
   * @param scopedSlots 
   * @param createElement 
   * @param dataSource 
   */
  resolveScopedSlot (scopedSlots: any, createElement: Function, dataSource: any) {
    for (const slot in scopedSlots) {
      const currentSlot : { component: ComponentDetails, scope: {[x:string]: any}} = scopedSlots[slot]
      
      scopedSlots[slot] = (prop : any): VNode => {
        const component: ComponentDetails = JSON.parse(JSON.stringify(currentSlot.component))
        const propVal: any = this.getTargetVariable(currentSlot.scope.data, prop) || null
        this.set(currentSlot.scope.location, propVal, component)

        return this.buildComponent(createElement, component, dataSource)
      }
    }
  }

  /**
   * Translates the property if the token exists
   *
   * @param property
   * @returns void
   */
  translateProperty (property: any): void {
    if (property.indexOf(this.TOKEN.translate) === 0) {
      return this.$t(property.replace(this.TOKEN.translate, ''))
    }

    return property
  }

  /**
   * Attaches event handlers to the components
   *
   * @param component
   * @returns void
   */
  attachEventHandlers (component: ComponentDetails): void {
    const on: { [key: string]: Function | Function[] } = {}

    if (this.isset(component.events) === true) {
      const keys = Object.keys(<object>component.events)

      keys.forEach((key: string): void => {
        const handler: any = (<object>component.events)[key]

        if (Array.isArray(handler) === true) {
          on[key] = handler.map(
            (handlerName: string): Function => {
              return this.eventHandlers[handlerName]
            }
          )
        } else {
          on[key] = this.eventHandlers[handler]
        }
      })
    }

    this.attachInputHandler(component, on)
    component.properties.on = on
  }

  /**
   * Input handler for 2 way bound components
   *
   * @param event
   * @param component
   * @returns void
   */
  inputHandler (event: any, component: ComponentDetails): void {
    const val = (event instanceof Event) ? (<HTMLInputElement>event.target).value : event
    this.set(component.vmodel, val, this.pageVars)
    this.$emit('input', val)
  }

  /**
   * Attach input handler for 2 way bound components
   *
   * @param component
   * @param handlers
   * @returns void
   */
  attachInputHandler (
    component: ComponentDetails,
    handlers: { [key: string]: Function | Function[] }
  ): void {
    if (this.isset(component.vmodel) === true) {
      const target: any = this.getTargetVariable(<string>component.vmodel, this.pageVars)

      component.properties.attrs = Object.assign(
        {},
        component.properties.attrs,
        { value: target }
      )

      const inputHandler: Function = (event: Event): void => {
        this.inputHandler(event, component)
      }

      if (Array.isArray(handlers.input) === true) {
        ;(<Array<Function>>handlers.input).push(inputHandler)
      } else {
        handlers.input = inputHandler
      }
    }
  }

  /**
   * Retrives value in a nested object using string pointer
   * 
   * @param path 
   * @param obj 
   * @returns any
   */
  getTargetVariable (path: string, obj: {[x: string]: any}): any {
    const src: Array<string> = path.split('.')
    let target: any = obj[src[0]]

    for (let idx = 1; idx < src.length; idx++) {
      target = target[src[idx]]
    }

    return target
  }

  /**
   * Sets the value of nested object property
   * 
   * @param path 
   * @param value
   * @param obj
   */
  set (path: string | undefined, value: any, obj: {[x: string]: any}): void {
    if (path === undefined) {
      return
    } 

    let data: {[x: string]: any} = obj
    const target: Array<string> = path.split('.')

    for (let i: number = 0; i < target.length - 1; i++) {
      const elem = target[i]
      if ( !data[elem] ) data[elem] = {}
      data = data[elem]
    }

    data[target[target.length - 1]] = value
  }

  /**
   * Checks if a variable has value
   *
   * @param variable
   * @returns boolean
   */
  isset (variable: any): boolean {
    return variable !== undefined && variable !== null
  }
}
