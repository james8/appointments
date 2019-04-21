<!-- NavigationTabs Component

-->

<template>
    <div id="navigation-tabs">
        <ul class="menu normalMenu" role="menu">
            <li class="menuItem" role="menuitem" v-for="(route, index) in routes" :key="index" v-bind:class="{ menuItemSelected: isMenuItemSelected }">
                <router-link :to="route.path">{{ route.name }}</router-link>
            </li>
            <li class="menuItem" role="menuitem">
                <span class="fas fa-sign-out-alt" @click="Logout()"></span>
            </li>
        </ul>

        <div class="menu mobileMenu">
            <button type="button" class="menuToggle fas fa-bars" @click="OpenMobileMenu();"></button>
            <ul class="menu" role="menu" v-bind:class="cssMenuClass">
                <li class="menuItem" role="menuitem" v-for="(route, index) in routes" :key="index" inert @click="CloseMobileMenu();">
                    <router-link :to="route.path">{{ route.name }}</router-link>
                </li>
                <li class="menuItem" role="menuitem" inert @click="CloseMobileMenu();">
                    <span @click="Logout()">Logout</span>
                </li>
            </ul>
            <backdrop @backdropClicked="CloseMobileMenu();" v-if="cssMenuClass === 'menuOpen'"></backdrop>
        </div>
    </div>
</template>

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    import Backdrop from "@/components/Backdrop.vue";

    @Component({
        components: {
            Backdrop
        }
    })
    export default class NavigationTabs extends Vue {
        routes: Array<any> = [];
        isMenuItemSelected: boolean = false;
        cssMenuClass: string = "";
        
        created(): void {
            // get defined routes
            const routerRoutes = (this.$router as any).options.routes;

            // remove 404 route
            routerRoutes.forEach((route: any) => {
                if (route.path !== "*") this.routes.push(route);
            });
        }

        Logout(): void {
            console.log('logout');
        }

        OpenMobileMenu(): void {
            this.cssMenuClass = "menuOpen";
            setTimeout(() => { (document.querySelector('.mobileMenu .router-link-active') as HTMLInputElement).focus(); }, 50);

            const attr: string = "inert";
            const navElems: NodeListOf<Element> = document.querySelectorAll('.mobileMenu ul li');
            navElems.forEach((navElem: Element) => navElem.removeAttribute(attr));
            (document.querySelector('.mobileMenu button') as HTMLButtonElement).setAttribute(attr, '');
            (document.querySelector('#navigation-tabs ~ div') as HTMLElement).setAttribute(attr, '');
        }

        CloseMobileMenu(): void {
            this.cssMenuClass = "";
        }
    };
</script>

<style scoped>
    #navigation-tabs .menu {
        background: linear-gradient(#166f94, #10536f);
        height: 48px;
    }

    #navigation-tabs ul {
        list-style: none;
        margin: 0px;
        padding: 0px;
        display: flex;
    }

    #navigation-tabs .menuItem a, #navigation-tabs .menuItem span {
        color: #fff;
        cursor: pointer;
        padding: 15px 40px;
        text-decoration: none;
        display: block;
    }

    /* normal menu */
    #navigation-tabs .normalMenu li:last-of-type {
        background-color: rgba(255, 0, 0, 0.25);
        font-size: 24px;
        position: absolute;
        right: 0px;
    }

    #navigation-tabs .normalMenu .fa-sign-out-alt {
        padding: 12px 15px 12px 20px !important;
    }

    #navigation-tabs .normalMenu .menuItem a:hover,
    #navigation-tabs .normalMenu .menuItem span:hover,
    #navigation-tabs .mobileMenu .menuToggle:hover,
    #navigation-tabs .mobileMenu .menuItem a:hover {
        background-color: rgba(0, 0, 0, 0.3);
        cursor: pointer;
    }

    #navigation-tabs .router-link-active {
        background-color: rgba(0, 0, 0, 0.3);
        cursor: default !important;
    }

    /* mobile menu */
    #navigation-tabs .mobileMenu {
        display: none;
    }

    #navigation-tabs .mobileMenu .menuToggle {
        background-color: transparent;
        border: none;
        color: #fff;
        font-size: 22px;
        height: 48px;
        width: 48px;
    }
   
    #navigation-tabs .mobileMenu ul {
        background: linear-gradient(#166f94, #10536f);
        height: auto;
        padding: 0px;
        width: 225px;
        position: fixed;
        top: 0px;
        bottom: 0px;
        z-index: 10;
        display: flex;
        flex-direction: column;
        transform: translateX(-225px);
        transition: transform 0.2s;
    }

    #navigation-tabs .mobileMenu .menuOpen {
        transform: translateX(0px);
        transition: transform 0.2s;
    }

    @media screen and (max-width: 1115px) {
        #navigation-tabs .normalMenu {
            display: none;
        }

        #navigation-tabs .mobileMenu {
            display: flex;
        }
    }
</style>
