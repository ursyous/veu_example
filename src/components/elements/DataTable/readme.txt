DATA TABLE Readme
---------------------------------------------------------------------------------
Data Table DOs:
---------------------------------------------------------------------------------
You can use the ff. properties at the same time:
- tableData
- apiLink
- loadingMessage
- tableHeight
- maxRows

Add following routes to your custom API
- / : for primary selection
- /search : for searching
- /page: for pagination and sorting
---------------------------------------------------------------------------------
Data Table DONT's:
---------------------------------------------------------------------------------
Following will have conflicts with other props:

- searchColumn: if searchColumn prop is used together with tableData,
it will not function well for logic prioritizes tableData; that doesn't support
SS functions.

- sortable: if sortable prop is used together with partialBuffer,
the partialBuffer's SSS (Server Side Sorting) will be overlapped.

- partialBuffer: if partialBuffer prop is used with the following props:
    - tableData: tableData will overlap it.
    - sortable: SSS (server side sorting) will not work
    - apiLink (external APIs) : will not load properly

- allowSearch: if allowSearch prop is used together with tableData,
it will not function well for logic prioritizes tableData; that doesn't support
SS functions.
