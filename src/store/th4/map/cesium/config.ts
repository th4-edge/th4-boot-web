import * as Cesium from 'cesium';

export default {
    token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJmY2Y0Y2QxNy02MjBkLTRjZjEtYWI2Yy1iMzY3ZTJhYzc4NzIiLCJpZCI6MjU0MTE5LCJpYXQiOjE3MzEyMTQwODF9.mQC5UPgvKMvJXJ4NdzXWc03o-DM5iKZVyygpEsWQRq0',
    mapOption:{
        sceneMode: Cesium.SceneMode.SCENE3D,
        infoBox: false, // 右侧信息框
        selectionIndicator: false, //选中状态
       // scene3DOnly: true,
        timeline: false, //时间轴控件
        animation: false, //动画控件
        geocoder: false, //搜索控件
        homeButton: false, //主页控件
        sceneModePicker: false, //投影控件
        baseLayerPicker: false, //图层控件
        navigationHelpButton: false, //帮助控件
        fullscreenButton: false, //全屏控件
    },
    mapConfig:{
        center: [105.85, 34.25],
        zoomUnit:100,
        zoom: 5,
        maxZoom: 18,
        minZoom: 3,
        orientation: {
            heading: 0,
            pitch: 0,
            roll: 0
        }
    }
}