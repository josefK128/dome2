<!-- access (later edit) stylesheets and rules by filename -->
<!-- if embedded script must (for now) be in es5 only (as here) -->
<!-- NOTE accessing link el by id does not yield the stylesheet! -->
<script>
  var stylesheet,
      kfs,
      i;
  for(i in document.styleSheets ){
    if( document.styleSheets[i].href && /keyframes\.css$/.test(document.styleSheets[i].href)) {
      stylesheet = document.styleSheets[i];
      break;
    }
  }
  console.log("stylesheet = " + stylesheet);
  kfs = stylesheet.cssRules;
  for(i=0; i<kfs.length; i++){
    console.log("kfs[" + i + "] = " + kfs[i]);
    console.log("rule = " + kfs[i].cssText);
  }
</script>
