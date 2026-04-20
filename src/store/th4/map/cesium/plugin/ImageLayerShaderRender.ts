import * as Cesium from "cesium";

export class ImageLayerShaderRender {

    protected _map: th4.map.Map | undefined;

    protected _invertColor = true;
   // 60,145,172
    //0,50,100
    protected _color = [60, 145, 172];

    constructor(color: number[], map?: th4.map.Map) {
        this._map = map;
        this._color = color;
    }

    install(map?: th4.map.Map) {
        const _map = map || this._map;
        if (_map?.map instanceof Cesium.Viewer) {

            const viewer = _map.map;
            //   更改底图着色器的代码
            // @ts-ignore
            const baseFragmentShader = viewer.scene.globe._surfaceShaderSet.baseFragmentShaderSource.sources;
            // console.log(baseFragmentShader);

            // 循环修改着色器
            for (let i = 0; i < baseFragmentShader.length; i++) {
                // console.log(baseFragmentShader[i]);
                const strS = "color = czm_saturation(color, textureSaturation);\n#endif\n";
                let strT = "color = czm_saturation(color, textureSaturation);\n#endif\n";
                if (this._invertColor) {
                    strT += `
                        color.r = 1.0 - color.r;
                        color.g = 1.0 - color.g;
                        color.b = 1.0 - color.b;
                      `;
                }
                if (this._color) {
                    strT += `
                        color.r = color.r*${this._color[0]}.0/255.0;
                        color.g = color.g*${this._color[1]}.0/255.0;
                        color.b = color.b*${this._color[2]}.0/255.0;
                      `;
                }

                baseFragmentShader[i] = baseFragmentShader[i].replace(strS, strT);
            }
        }
    }
}