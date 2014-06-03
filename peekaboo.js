/**
 * jQuery peekaboo
 *
 * @url   http://github.com/simonpjones/peekaboo
 * @author  Simon Jones <simon@simonpjones.co.uk>
 * @version 1.0.0 06-02-2014
 * This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

(function ( $ ) {
  $.fn.peekaboo = function(options) {
      var $form = this;
      var $conditionals = $form.find("[data-watch]");
      var opts = $.extend({}, $.fn.peekaboo.defaults, options);

      $conditionals.closest(opts.ancestor).hide();

      var $watchables = $form.find("[data-watchable]");

      $watchables.each(function(){
        var $watchable = $(this);
        var watchName = $watchable.data("watchable");
        var $watchers = $form.find("[data-watch*='" + watchName + "']");

        $watchable.on('change', function(){
          if ($(this).prop("checked")){
            $watchers.closest(opts.ancestor).show();
          } else {
            $watchers.each(function(){
              var hide = true;
              var $watcher = $(this);
              var $watching = $watcher.data('watch').split(" ");
              for(var i in $watching){
                var watchingName = $watching[i];
                if (watchingName == watchName){
                  continue;
                }
                if (!hide) {
                  break;
                }
                hide = !$form.find("[data-watchable='" + watchingName + "']").prop("checked");
              };
              if (hide){
                $watcher.val(opts.default_value).closest(opts.ancestor).hide();
              }
            });
          }
        });
      });
      return this;
  }

  $.fn.peekaboo.defaults = {
    ancestor: "tr",
    default_value: ''
  };
})(jQuery);
