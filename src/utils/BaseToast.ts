import { toast, type CSSTransitionProps } from 'vue3-toastify';

export const showToast = (message: string, type: "info" | "success" | "error" = "info") => {
    toast(message, {
        type: type,
        position: "bottom-right",
        transition: fade,
        autoClose: 5000,
    });
}

const fade: CSSTransitionProps = {
    enter: "toast-fade-enter",
    exit: "toast-fade-exit",
    appendPosition: false,
    collapse: false
}