<template>
    <div class="row m-4">
        <div class="col-3">
            <div class="p-2 alert alert-primary">
                <h3 class="m-2">Backlog</h3>
                <draggable class="list-group" :list="backLogTasks" :group="{ name: 'tasks'}" :move="detectMove">
                    <TransitionGroup id="backLogTasks" type="transition" :name="'flip-list'">
                        <div id="task" class="list-group-item" v-for="task in backLogTasks" :key="task.description">
                            {{ task.description }}
                            <b-icon icon="trash-fill" @click="deleteBackLogTask(task)"></b-icon>
                        </div>
                    </TransitionGroup>
                </draggable>
            </div>
        </div>

        <div class="col-3">
            <div class="p-2 alert alert-secondary">
                <h3 class="m-2">In Progress</h3>
                <draggable class="list-group" :list="inProgressTasks" :group="{ name: 'tasks'}" :move="detectMove">
                    <TransitionGroup id="inProgressTasks" type="transition" :name="'flip-list'">
                        <div id="task" class="list-group-item" v-for="task in inProgressTasks" :key="task.description">
                            {{ task.description }}
                            <b-icon icon="trash-fill" @click="deleteInProgressTask(task)" class="1em"></b-icon>
                        </div>
                    </TransitionGroup>
                </draggable>
            </div>
        </div>

        <div class="col-3">
            <div class="p-2 alert alert-warning">
                <h3 class="m-2">Testing</h3>
                <draggable class="list-group" :list="testingTasks" :group="{ name: 'tasks'}" :move="detectMove">
                    <TransitionGroup id="testingTasks" type="transition" :name="'flip-list'">
                        <div id="task" class="list-group-item" v-for="task in testingTasks" :key="task.description">
                            {{ task.description }}
                            <b-icon icon="trash-fill" @click="deleteTestingTask(task)" class="1em"></b-icon>
                        </div>
                    </TransitionGroup>
                </draggable>
            </div>
        </div>

        <div class="col-3">
            <div class="p-2 alert alert-secondary">
                <h3 class="m-2">Completed</h3>
                <draggable class="list-group" :list="completedTasks" :group="{ name: 'tasks'}" :move="detectMove">
                    <TransitionGroup id="completedTasks" type="transition" :name="'flip-list'">
                        <div id="task" class="list-group-item" v-for="task in completedTasks" :key="task.description">
                            {{ task.description }}
                            <b-icon icon=" trash-fill" @click="deleteCompletedTask(task)" class="1em"></b-icon>
                        </div>
                    </TransitionGroup>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script>
import { liveQuery } from "dexie";
import { useObservable } from "@vueuse/rxjs";
import { db } from "../db";
import draggable from "vuedraggable";

export default {
    name: "TaskList",
    setup() {
        return {
            db,
            backLogTasks: useObservable(
                liveQuery(() => db.backLogTasks.toArray()),
            ),
            inProgressTasks: useObservable(
                liveQuery(() => db.inProgressTasks.toArray()),
            ),
            testingTasks: useObservable(
                liveQuery(() => db.testingTasks.toArray()),
            ),
            completedTasks: useObservable(
                liveQuery(() => db.completedTasks.toArray()),
            ),
        }
    },
    components: {
        draggable
    },
    methods: {
        async deleteBackLogTask(task) {
            db.backLogTasks.delete(task.id)
            console.log("Task", task.id, "deleted");
        },

        async deleteInProgressTask(task) {
            db.inProgressTasks.delete(task.id)
            console.log("Task", task.id, "deleted");
        },

        async deleteTestingTask(task) {
            db.testingTasks.delete(task.id)
            console.log("Task", task.id, "deleted");
        },

        async deleteCompletedTask(task) {
            db.completedTasks.delete(task.id)
            console.log("Task", task.id, "deleted");
        },

        detectMove: async function (event) {
            var nextTable = event.to.id;
            var prevTable = event.from.id;
            var taskId = event.draggedContext.element.id;
            var taskDescription = event.draggedContext.element.description;

            console.log(event);
            console.log(taskId + " " + prevTable + " to " + nextTable);

            switch (nextTable) {
                case "backLogTasks":
                    console.log("putting something in backlog");
                    await db.backLogTasks.put({
                        id: taskId,
                        description: taskDescription
                    })

                    switch (prevTable) {
                        case "backLogTasks":
                            await db.backLogTasks.delete(taskId);
                            break;

                        case "inProgressTasks":
                            await db.inProgressTasks.delete(taskId);
                            break;

                        case "testingTasks":
                            await db.testingTasks.delete(taskId);
                            break;

                        case "completedTasks":
                            await db.completedTasks.delete(taskId);
                            break;

                        default:
                            break;
                    }

                    break
                case "inProgressTasks":
                    console.log("putting something in inprogress");
                    await db.inProgressTasks.put({
                        id: taskId,
                        description: taskDescription
                    })

                    switch (prevTable) {
                        case "backLogTasks":
                            await db.backLogTasks.delete(taskId);
                            break;

                        case "inProgressTasks":
                            await db.inProgressTasks.delete(taskId);
                            break;

                        case "testingTasks":
                            await db.testingTasks.delete(taskId);
                            break;

                        case "completedTasks":
                            await db.completedTasks.delete(taskId);
                            break;

                        default:
                            break;
                    }

                    break
                case "testingTasks":
                    console.log("putting something in testing");
                    await db.testingTasks.put({
                        id: taskId,
                        description: taskDescription
                    })

                    switch (prevTable) {
                        case "backLogTasks":
                            await db.backLogTasks.delete(taskId);
                            break;

                        case "inProgressTasks":
                            await db.inProgressTasks.delete(taskId);
                            break;

                        case "testingTasks":
                            await db.testingTasks.delete(taskId);
                            break;

                        case "completedTasks":
                            await db.completedTasks.delete(taskId);
                            break;

                        default:
                            break;
                    }

                    break
                case "completedTasks":
                    console.log("putting something in completed");
                    await db.completedTasks.put({
                        id: taskId,
                        description: taskDescription
                    })

                    switch (prevTable) {
                        case "backLogTasks":
                            await db.backLogTasks.delete(taskId);
                            break;

                        case "inProgressTasks":
                            await db.inProgressTasks.delete(taskId);
                            break;

                        case "testingTasks":
                            await db.testingTasks.delete(taskId);
                            break;

                        case "completedTasks":
                            await db.completedTasks.delete(taskId);
                            break;

                        default:
                            break;
                    }

                    break
                default:
                    break;
            }
        },
    },
}
</script>

<style>
.flip-list-move {
    transition: transform 0.2s;
}

.no-move {
    transition: transform 0s;
}

.list-group {
    min-height: 20px;
}

.list-group-item {
    cursor: move;
}

.list-group-item i {
    cursor: pointer;
}

.ghost {
    opacity: 1;
    background: #c8ebfb;
}

b-container {
    background-color: gray;
}

div.list-group-item:hover {
    background-color: ghostwhite;
}

div.list-group-item {
    word-wrap: break-word;
}
</style>