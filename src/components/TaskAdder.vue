<template>
    <div class="header">
        <b-row>
            <b-col cols="9">
                <b-form-input placeholder="Add Task" v-model="taskDescription" type="text" @keydown.enter="addTask"
                    class="text-center" trim>
                </b-form-input>
            </b-col>
            <b-col>
                <b-button @click="clearAll">Clear All</b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { db } from "../db";

export default {
    name: "TaskAdder",
    data: () => {
        return {
            taskDescription: ''
        }
    },
    methods: {
        async addTask() {
            if (this.taskDescription === '') {
                alert("Enter a Task")
            }
            else {
                await db.backLogTasks.add({
                    description: this.taskDescription
                })
            }
            this.taskDescription = '';
        },
        async clearAll() {
            db.backLogTasks.clear();
            db.inProgressTasks.clear();
            db.testingTasks.clear();
            db.completedTasks.clear();
            this.taskDescription = '';
            console.log("All tasks cleared");
        }
    },
}
</script>

<style>
div.header {
    margin: 50px;
}
</style>