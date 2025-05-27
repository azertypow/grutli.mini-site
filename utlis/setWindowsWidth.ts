import type {UnwrapRef} from "vue";

const breakpointCSSMinWidthBreakpoint = 1200

export function setWindowsWidth(propertyToSet: () => Ref<boolean>) {
    propertyToSet().value = window.innerWidth < breakpointCSSMinWidthBreakpoint
}
