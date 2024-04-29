<script lang="ts">
    export let callback: (...params: any[]) => boolean;
    export let handleUnPause: () => void;
    export let dependencies: Array<any>

    $:{
        let result = callback(...dependencies);
        if(result){
            handleUnPause();
        }
    }
</script>

<p>Pausing</p>