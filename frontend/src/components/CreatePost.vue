<template>
  <main id="Post">
    <div>
      <form class="px-4 py-3 Post" id="formpost" encType="multipart/form-data">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" class="form-control" id="title" v-model="title" placeholder="Add your title here" aria-required="true" required /><br>
          <span class="error" v-if="(!$v.title.required && $v.title.$dirty)">Add title</span>
        </div>
        <div class="form-group">
          <label for="content">Message</label>
          <textarea class="form-control textarea " v-model="content" rows="2" id="content" placeholder="Add your message here" aria-required="true" required></textarea>
        </div>
        <div class="form-group">
          <label class="sr-only" for="image" title="image" role="button">Image</label>
          <input type="file" accept=".png, .jpg, .jpeg, .gif, .webp" v-on:change="onSelect" ref="file" aria-required="true" id="image" />
        </div>
        <span class="error" v-if="(!$v.content.required && $v.content.$dirty)">Add your text and a picture</span><br><br>
        <span id="notfound" class="error"> </span>
        <button type="submit" class="btn btn-primary signup" @click="Postform()">Post</button>
      </form>
    </div>
  </main>
</template>

<script>

</script>
<style scoped>
#post {
  text-align: left;
}
.error {
  color: red;
}
</style>