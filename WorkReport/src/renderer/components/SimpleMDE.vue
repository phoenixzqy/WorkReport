<template>
	<textarea ref="area"></textarea>
</template>

<script>
import simplemde from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

export default {
	props: ['value'],
	mounted() {
		this.mde = new simplemde({
			element: this.$refs.area,
			// Put your extra SimpleMDE settings here.
		})
		this.mde.value(this.value)
		var self = this
		this.mde.codemirror.on('change', function() {
			self.$emit('input', self.mde.value())
		})
	},
	watch: {
		value(newVal) { if (newVal != this.mde.value()) { this.mde.value(newVal) } }
	},
	beforeDestroy() {
		this.mde.toTextArea() // clean up when component gets destroyed.
	}
}
</script>
<style>
.CodeMirror, .CodeMirror-scroll {
	min-height: 350px;
}
</style>
