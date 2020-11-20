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
                        :img-pic="`/image/${item.img}`"
                        :title="item.title"
                        :oldPrice="item.oldPrice"
                        :price="item.price"
                        :tUrl="item.tUrl"
                        :tAllUrl="item.tUrlAll"
                    ></co-item>
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, nextTick } from 'vue';
import { List, PullRefresh  } from 'vant';
import Axios from 'axios';
import CoItem from './item.vue'

export default defineComponent({
    props: {
        type: String
    },
    components: {
        CoItem,
        [List.name]: List,
        [PullRefresh.name]: PullRefresh,
    },
    setup(props) {
        let refreshing = ref(true);
        let loading = ref(true);
        let finished = ref(false);
        let state = reactive({
            data: [],
            page: 0,
            pageSize: 10,
        });

        const getData = async (page, pageSize) => {
            // return import('../../public/data')
            const url = props.type ? `../../data/${props.type}-data.json` : '../../data/data.json';
            return Axios.get(url)
                .then(JSONData => {
                    let allData = JSONData.data;
                    let allount =allData.length
                    let startIndex = (page - 1) * pageSize;
                    let endIndex = page * pageSize;
                    let newData = allData.slice(startIndex, endIndex);
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
                });
        };  

        const onLoad = () => {
            loading.value = true;
            state.page += 1;
            getData(state.page, state.pageSize).then((data) => {
                state.data.push(...data.data);
                nextTick(() => {
                    finished.value = data.finished;
                    loading.value = false;
                });
            }).catch(() => {
                nextTick(() => {
                    finished.value = true;
                    loading.value = false;
                });
            });
        }

        const onRefresh =() => {
            state.page = 1;
            refreshing.value = true;
            getData(1, state.pageSize).then((data) => {
                state.data = data.data;
                nextTick(() => {
                    refreshing.value = false;
                    finished.value = data.finished;
                });
            })
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
