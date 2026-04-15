<script lang="ts" setup>
defineOptions({
    name: 'Fee',
})
definePage({
    style: {
        navigationBarTitleText: '%fee.title%',
    },
})
</script>

<template>
    <view class="min-h-screen pb-safe">
        <t-collapse default-expand-all>
            <t-collapse-panel
                header="开卡费"
                :value="0"
                expand-icon
            >
                <uni-table stripe border empty-text="暂无更多数据">
                    <uni-tr>
                        <uni-th width="170" align="center" class="bg-gray-300 text-gray-800!">
                            项目
                        </uni-th>
                        <uni-th width="200" align="center" class="bg-gray-300 text-gray-800!">
                            费率明细
                        </uni-th>
                        <uni-th width="270" align="center" class="bg-gray-300 text-gray-800!">
                            备注
                        </uni-th>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            <text class="my-auto">开卡费</text>
                        </uni-td>
                        <uni-td>
                            <view class="flex flex-col">
                                <text>$ 1.00 for 1 month EXP</text>
                                <text>$ 2.00 for 3 month EXP</text>
                                <text>$ 3.00 for 6 month EXP</text>
                                <text>$ 5.00 for 12 month EXP</text>
                            </view>
                        </uni-td>
                        <uni-td>
                            <view class="flex flex-col">
                                <text>有效期1个月的卡片，收费 1 USD/卡</text>
                                <text>有效期3个月的卡片，收费 2 USD/卡</text>
                                <text>有效期6个日的卡片，收费 3 USD/卡</text>
                                <text>有效期12个月的卡片，收费5 USD/卡</text>
                            </view>
                        </uni-td>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            休眠帐户管理费
                        </uni-td>
                        <uni-td>$2.00 / month</uni-td>
                        <uni-td>用户开卡后6个月未启用或启用帐户后，连续6个月无任何交易活动，将于第7个月开始每月从卡片或帐户中扣缴休眠帐户管理费</uni-td>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            到期卡片管理费
                        </uni-td>
                        <uni-td>$15.00 / month</uni-td>
                        <uni-td>卡有效期届满后第2个月开始收费，直至卡片余额为零或注销为止</uni-td>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            卡片注销或领回余额
                        </uni-td>
                        <uni-td>$15.00 per card per time</uni-td>
                        <uni-td>用户可通过单卡管理菜单卡片注销的选项领回余额</uni-td>
                    </uni-tr>
                </uni-table>
            </t-collapse-panel>

            <t-collapse-panel
                header="海外交易费"
                :value="1"
                expand-icon
            >
                <uni-table stripe border empty-text="暂无更多数据">
                    <uni-tr>
                        <uni-th width="190" align="center" class="bg-gray-300 text-gray-800!">
                            项目
                        </uni-th>
                        <uni-th width="130" align="center" class="bg-gray-300 text-gray-800!">
                            费率明细
                        </uni-th>
                        <uni-th width="250" align="center" class="bg-gray-300 text-gray-800!">
                            备注
                        </uni-th>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            美国本土用卡
                        </uni-td>
                        <uni-td align="center">
                            0
                        </uni-td>
                        <uni-td>
                            美国本土默认货币美金USD
                        </uni-td>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            外币交易
                        </uni-td>
                        <uni-td align="center">
                            2.00%+$0.30
                        </uni-td>
                        <uni-td>以默认货币美金USD以外的货币进行的任何购买</uni-td>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            从非美国本土商家的购买
                        </uni-td>
                        <uni-td align="center">
                            2.00%+$0.30
                        </uni-td>
                        <uni-td>这包括从位于美国之外或在美国之外处理的网站进行的在线购买，即使金额采用默认货币USD</uni-td>
                    </uni-tr>
                    <uni-tr>
                        <uni-td align="center" class="bg-gray-300 text-gray-800!">
                            服务和数字产品购买
                        </uni-td>
                        <uni-td align="center">
                            2.00%+$0.30
                        </uni-td>
                        <uni-td>来自国际平台或公司的订阅或服务</uni-td>
                    </uni-tr>
                </uni-table>
            </t-collapse-panel>
        </t-collapse>
    </view>
</template>

<style lang="scss" scoped>
//
</style>
