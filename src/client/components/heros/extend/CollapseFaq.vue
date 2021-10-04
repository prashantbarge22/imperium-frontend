<script>
    import Collapse from './../../../../../node_modules/vue-collapse'

    export default {
        name: 'CollapseFaq',
        extends: Collapse,
        methods: {
            toggle() {
                Collapse.methods.toggle.call(this);

                let qRef = this.$vnode.data.ref;

                if (typeof qRef === 'undefined') {
                    return;
                }

                this.$router.replace('/faq/' + qRef);
            }
        },
    }
</script>