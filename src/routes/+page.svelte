<script lang="ts">
	import { graphql } from '$houdini';
import { last_ping, last_pong } from '$lib/stores';

	const updates = graphql(`
		subscription test {
      houdini_test {
        id
        name
      }
    }
	`);

	let open = false;
	function handler() {
		open = !open;
		if (open === true) updates.listen();
		if (open === false) updates.unlisten();
	}
  
</script>

<button class="p-3 bg-yellow-500 rounded-lg" on:click={handler}>test it</button>

open: {open}
<hr />
last ping: {$last_ping}
<hr />
last pong: {$last_pong}

<hr />
{JSON.stringify($updates)}
