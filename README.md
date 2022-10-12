# kanban_board
### Bugs
```
Major visual bug when draggin items across other items, will "visually" duplicate itself (probably due to vue-draggable :move)

Database side, there are no duplicates. After a refresh, the data appears where it should be with the duplicates removed
```
```
Dexie.js appears to be unable to accept variables as table names and only accepts the exact table names (or maybe I just did it wrong)

**Example that doesn't work : **
tablename = "backLogTasks"
db.tablename.delete()

**Example that does work : **
db.backLogTasks.delete()

Due to this, there are many unecessary conditional statements (which is very ugly and horrible)
```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
