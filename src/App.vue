<template>
    <router-view></router-view>
</template>

<style lang="stylus">
background(src)
    position: relative;
    background-image: url(src);
    background-position: center top;
    background-size: cover;
    background-attachment:fixed;

glass(src)
    //position: absolute;
    position: relative;
    box-shadow: 0 1px 4px rgba(0,0,0,0.5);
    overflow: hidden;
    z-index: 2;

    &::before
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        filter: blur(20px);
        z-index: -1;
        margin: -30px;
        background-image: url(src);
        background-position: center top;
        background-size: cover;
        background-attachment: fixed;

.background {
    background("./assets/background.jpg")
}

.glass {
	glass("./assets/background.jpg")
}
</style>
