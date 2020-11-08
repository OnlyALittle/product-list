<style lang="less">
    .co-item {
        position: relative;
        width: calc(50% - 9px);
        height: 265px;
        border-radius: 6px;
        margin-top: 9px;
        margin-left: 4.5px;
        margin-right: 4.5px;
        box-sizing: border-box;
        background: #fff;
        overflow: hidden;
        .img {
            width: 100%;
            height: 178.5px;
            font-size: 0;
        }
        .title {
            font-size: 14px;
            font-weight: 600;
            margin-top: 11px;
            padding: 0 10px;
            .line-ellipsis(2, 100%);
        }
        .price {
            margin-top: 10px;
            padding: 0 8px;
            .strike-through {
                text-decoration: line-through;
            }
            .icon-cls {
                font-size: 11px;
                margin-right: 2px;
            }
            .new-price {
                font-size: 16px;
                color: #fa2c19;
                margin-right: 10px;
            }
            .old-price {
                font-size: 11px;
                color: #999999;
                .icon-cls {
                    margin-right: 0px;
                }
            }
        }
    }
    .ellipsis (@max-width: 100%) {
        max-width: @max-width;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .line-ellipsis (@num: 2, @max-width: 100%) {
        max-width: @max-width;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: @num;
        -webkit-box-orient: vertical;
    }
</style>

<template>
    <div class="co-item" @click="openT">
        <!-- img -->
        <div class="img">
            <van-image v-if="imgPic" width="100%" height="100%" fit="contain" :src="imgPic" />
        </div>
        <!-- title -->
        <div class="title">
            <span v-html="title" ></span>
        </div>
        <!-- price -->
        <div class="price">
            <span class="new-price">
                <span class="icon-cls">￥</span>
                <span>{{price}}</span>
            </span>
            <span class="strike-through old-price">
                <span class="icon-cls">￥</span>
                <span>{{oldPrice}}</span>
            </span>
        </div>

    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { Image as VanImage } from 'vant';
import { tTiggle } from '../utils/index';

export default defineComponent({
    components: {
        VanImage
    },
    props: {
        imgPic: String,
        title: String,
        tUrl: String,
        tAllUrl: String,
        oldPrice: [String, Number],
        price: [String, Number],
    },
    setup(props) {
        const openT = () => {
            tTiggle(props.tUrl);
        };

        return {
            openT
        }
    }
})
</script>
