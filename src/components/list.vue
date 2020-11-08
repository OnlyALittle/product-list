<style lang="less">
    .co-list {
        .list-wrapper {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
        }
    }
</style>

<template>
    <div class="co-list">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list
                v-model:loading="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
                <div class="list-wrapper">
                    <co-item
                        v-for="item in state.data" :key="(item.id || item.img)"
                        :img-pic="require(`../assets//pic/${item.img}`)"
                        :title="item.title"
                        :oldPrice="item.oldPrice"
                        :price="item.price"
                        :tUrl="item.tUrl"
                    ></co-item>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, nextTick } from 'vue';
import { List, PullRefresh  } from 'vant';
import CoItem from './item.vue'
import JSONData from '../../public/data';

export default defineComponent({
    components: {
        CoItem,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
    },
    setup() {
        let allData = JSONData;
        let allount =allData.length
        let refreshing = ref(true);
        let loading = ref(true);
        let finished = ref(false);
        let state = reactive({
            data: [],
            page: 0,
            pageSize: 10,
        });

        const getData = (data, page, pageSize) => {
            let startIndex = (page - 1) * pageSize;
            let endIndex = page * pageSize;
            let newData = data.slice(startIndex, endIndex);
            if (allount <= page * pageSize) {
                return {
                    data: newData,
                    finished: true
                }
            } else {
                return {
                    data: newData,
                    finished: false
                }
            }
        };  

        const onLoad = () => {
            console.log('onLoad');
            loading.value = true;
            state.page += 1;
            let data = getData(allData, state.page, state.pageSize);
            state.data.push(...data.data);
            console.log(data.data.length)
            nextTick(() => {
                finished.value = data.finished;
                loading.value = false;
            });
        }

        const onRefresh =() => {
            console.log('onRefresh')
            state.page = 1;
            refreshing.value = true;
            let data = getData(allData, 1, state.pageSize);
            state.data = data.data;
            nextTick(() => {
                refreshing.value = false;
                finished.value = data.finished;
            });
        }

        return {
            state,
            refreshing,
            loading,
            finished,
            onLoad,
            onRefresh
        };
    }
})
</script>
