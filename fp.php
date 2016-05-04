<?php
if(!$_GET) exit;
?><!DOCTYPE HTML>
<html lang="en-US">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="refresh" content="1;url=<?php echo $_GET['p']; ?>://cp?t=<?php echo $_GET['t']; ?>">
        <script type="text/javascript">
            window.location.href = "<?php echo $_GET['p']; ?>://cp?t=<?php echo $_GET['t']; ?>"
        </script>
        <title>Page Redirection</title>
    </head>
    <body>
        <!-- Note: don't tell people to `click` the link, just tell them that it is a link. -->
        If you are not redirected automatically, follow the <a href='<?php echo $_GET['p']; ?>://cp?t=<?php echo $_GET['t']; ?>'>link.</a>
    </body>
</html>
