<template>
    <div :class="skinIndex ? 'app-container theme-style' : 'app-container default-style'">
        <div class="toolbar-wrapper baseic-transition-style" style="-webkit-app-region: drag">
            <div class="app-logo">这是logo</div>
            <div class="btns-wrapper" style="-webkit-app-region: no-drag">
                <div class="nr-svg skin-btn" @click="checkoutSkin"></div>
                <div class="nr-svg minimize-btn" @click="handleOperation('min')"></div>
                <div :class="isMaximize ? 'nr-svg recovery-btn' : 'nr-svg maximize-btn'" @click="handleOperation('max')"></div>
                <div class="nr-svg close-btn" @click="handleOperation('close')"></div>
            </div>
        </div>
        <div class="content-container baseic-transition-style">
            <div class="menubar-wrapper baseic-transition-style">
                <div class="checkout-btn" @click="checkoutMenubarStatus">
                    <i :class='isCollapse ? "el-icon-s-unfold" : "el-icon-s-fold"'></i>
                </div>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span slot="title">导航一</span>
                        </template>
                        <el-menu-item-group>
                            <span slot="title">分组一</span>
                            <el-menu-item index="1-1">选项1</el-menu-item>
                            <el-menu-item index="1-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="1-4">
                            <span slot="title">选项4</span>
                            <el-menu-item index="1-4-1">选项1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">导航二</span>
                    </el-menu-item>
                    <el-menu-item index="3" disabled>
                        <i class="el-icon-document"></i>
                        <span slot="title">导航三</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">导航四</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="content-wrapper">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
  const {ipcRenderer} = require('electron')
  export default {
    name: 'basicLayout',
    data () {
      return {
        isCollapse: true,
        skinIndex: true,
        isMaximize: false
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      checkoutMenubarStatus () {
        this.isCollapse = !this.isCollapse
      },
      checkoutSkin () {
        this.skinIndex = !this.skinIndex
      },
      handleOperation (type) {
        type === 'max' && (this.isMaximize = !this.isMaximize)
        ipcRenderer.send(type)
      }
    }
  }
</script>

<style lang="less" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
    .app-container{
        width: 100%;
        height: 100vh;
        margin: 0;
        padding: 0;
        .toolbar-wrapper{
            width: 100%;
            height: 80px;
            padding: 0 20px;
            box-sizing: border-box;
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            .app-logo{
                width: 200px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                background: aqua;
            }
            .btns-wrapper{
                width: 200px;
                height: 60px;
                display: flex;
                justify-content: space-around;
                flex-wrap: nowrap;
                align-items: center;
                &>div{
                    color: #eee;
                    cursor: pointer;
                }
                .maximize-btn{
                    background: url("../assets/img/maximize.svg") no-repeat center / contain;
                }
                .skin-btn{
                    background: url("../assets/img/skin.svg") no-repeat center / contain;
                }
                .minimize-btn{
                    background: url("../assets/img/minimize.svg") no-repeat center / contain;
                }
                .recovery-btn{
                    background: url("../assets/img/recovery.svg") no-repeat center / contain;
                }
                .close-btn{
                    background: url("../assets/img/close.svg") no-repeat center / contain;
                }
            }
        }
        .content-container{
            .menubar-wrapper{
                width: fit-content;
                height: calc(100vh - 80px);
                position: relative;
                .el-menu{
                    border: none;
                }
                .checkout-btn{
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    position: absolute;
                    top: 0;
                    right: -40px;
                    &>i{
                        font-size: 20px;
                        line-height: 30px;
                        text-align: center;
                    }
                }
            }
            .content-wrapper{

            }
        }
    }
</style>

