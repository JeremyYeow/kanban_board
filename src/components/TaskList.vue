<template>
    <div class="row m-5">
        <div class="col-3">
            <div class="p-2 alert alert-primary">
                <h3 class="m-2">Backlog</h3>
                <draggable class="list-group">
                    <div class="list-group-item" v-for="task in backLogTasks" :key="task.description">
                        {{ task.description }}
                        <b-icon icon="trash-fill" @click="deleteTask"></b-icon>
                    </div>
                </draggable>
            </div>
        </div>

        <div class="col-3">
            <div class="p-2 alert alert-secondary">
                <h3 class="m-2">In Progress</h3>
                <draggable class="list-group">
                    <div class="list-group-item" v-for="task in inProgressTasks" :key="task.description">
                        {{ task.description }}
                        <b-icon icon="trash-fill" @click="deleteTask" class="1em"></b-icon>
                    </div>
                </draggable>
            </div>
        </div>

        <div class="col-3">
            <div class="p-2 alert alert-warning">
                <h3 class="m-2">Testing</h3>
                <draggable class="list-group">
                    <div class="list-group-item" v-for="task in testingTasks" :key="task.description">
                        {{ task.description }}
                        <b-icon icon="trash-fill" @click="deleteTask" class="1em"></b-icon>
                    </div>
                </draggable>
            </div>
        </div>

        <div class="col-3">
            <div class="p-2 alert alert-secondary">
                <h3 class="m-2">Completed</h3>
                <draggable class="list-group">
                    <div class="list-group-item" v-for="task in completedTasks" :key="task.description">
                        {{ task.description }}
                        <b-icon icon="trash-fill" @click="deleteTask" class="1em"></b-icon>
                    </div>
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
    data() {
        return {

        }
    },
    components: {
        draggable
    },
    setup() {
        return {
            db,
            backLogTasks: useObservable(
                liveQuery(() => db.backLogTasks.toArray())
            )
        }
    },
    methods: {
        async deleteTask() {
            //
        },
    },
}
</script>

<style>
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