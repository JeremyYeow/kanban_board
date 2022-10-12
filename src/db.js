import Dexie from "dexie";

export const db = new Dexie('myDatabase');
db.version(5).stores({
  backLogTasks: '++id, description',
  inProgressTasks: '++id, description',
  testingTasks: '++id, description',
  completedTasks: '++id, description'
});