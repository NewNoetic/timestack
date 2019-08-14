<script>
  import { Router, Link, Route } from "svelte-routing";
  import Authentication from "./routes/Authentication.svelte";
  import Slots from "./routes/Slots.svelte";
  import PostAuthentication from "./routes/PostAuthentication.svelte";

  export let url = "";
</script>

<Router url="{url}">
  <nav>
    <Link to="authentication">Authentication</Link>
    <Link to="slots">Slots</Link>
  </nav>
  <div>
    <Route path="authentication" component="{Authentication}" />
    <Route path="postAuthentication" component="{PostAuthentication}" />
    <Route path="slots" component="{Slots}" />
  </div>
</Router>