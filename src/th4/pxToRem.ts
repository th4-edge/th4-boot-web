const env=import.meta.env;


export  const pxToRem=(px:number)=>{
    return `${px / (env.VITE_POSTCSS_ROOT_VALUE||192) }rem`;
}