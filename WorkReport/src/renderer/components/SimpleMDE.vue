<template>
	<div>
		<textarea ref="area"></textarea>
		<!-- buttons -->
		<div class="buttons-container"><el-button 
			class="items" 
			@click="download"
			type="success">Download PDF</el-button>
		</div>
	</div>
</template>

<script>
import simplemde from "simplemde";
import "simplemde/dist/simplemde.min.css";
import * as html2pdf from "html2pdf.js";

export default {
  props: ["value"],
  data() {
    return {
      mde: null
    };
  },
  mounted() {
    this.mde = new simplemde({
      element: this.$refs.area,
      spellChecker: true
      // Put your extra SimpleMDE settings here.
    });
    this.mde.value(this.value);
    var self = this;
    this.mde.codemirror.on("change", function() {
      self.$emit("input", self.mde.value());
    });
  },
  watch: {
    value(newVal) {
      if (newVal != this.mde.value()) {
        this.mde.value(newVal);
      }
    }
  },
  methods: {
    download() {
      html2pdf(this.mde.options.previewRender(this.value), {
        margin: 15
      });
    }
  },
  beforeDestroy() {
    this.mde.toTextArea(); // clean up when component gets destroyed.
  }
};
</script>
<style>
.CodeMirror,
.CodeMirror-scroll {
  min-height: 350px;
}
</style>
