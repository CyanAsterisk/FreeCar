"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
Component({
    properties: {
        showModal: Boolean,
        showCancel: Boolean,
        title: String,
        contents: String,
    },
    options: {
        addGlobalClass: true,
    },
    data: {
        resolve: undefined,
    },
    methods: {
        onCancel() {
            this.hideModal('cancel');
        },
        onOK() {
            this.hideModal('ok');
        },
        hideModal(res) {
            this.setData({
                showModal: false,
            });
            this.triggerEvent(res);
            if (this.data.resolve) {
                this.data.resolve(res);
            }
        },
        showModal() {
            this.setData({
                showModal: true,
            });
            return new Promise((resolve) => {
                this.data.resolve = resolve;
            });
        }
    }
});
