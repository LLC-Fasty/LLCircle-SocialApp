import { supabase } from "../lib/supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post) => {
  // console.log("Initial post: ", post);
  try {
    if (post.file && typeof post.file == "object") {
      let isImage = post?.file?.type == "image";
      let folderName = isImage ? "postImages" : "postVideos";
      //   console.log("Uploading file to folder: ", folderName);
      let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
      //   console.log("File upload result: ", fileResult);

      if (fileResult.success) {
        post.file = fileResult.data;
        // console.log("File uploaded successfully: ", post.file);
      } else {
        // console.log("File upload failed: ", fileResult);
        return fileResult;
      }
    }

    // console.log("Creating/updating post in Supabase: ", post);
    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();

    if (error) {
      //   console.log("Supabase error: ", error);
      return { success: false, msg: "Could Not Create Your Post" };
    }

    console.log("Post created/updated successfully: ", data);
    return { success: true, data: data };
  } catch (error) {
    console.log("createPost error: ", error);
    return { success: false, msg: "Could Not Create Your Post" };
  }
};
export const fetchPosts = async (limit = 10, userId) => {
  // console.log("Initial post: ", post);
  try {
    if (userId) {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `*, user: users(id, name, image), postLikes(*), comments (count)`
        )
        .order("created_at", { ascending: false })
        .eq("userId", userId)
        .limit(limit);

      if (error) {
        console.log("Fetch Post Error: ", error);
        return { success: false, msg: "Could Not Fetch Posts" };
      }

      return { success: true, data: data };
    } else {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `*, user: users(id, name, image), postLikes(*), comments (count)`
        )
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) {
        console.log("Fetch Post Error: ", error);
        return { success: false, msg: "Could Not Fetch Posts" };
      }

      return { success: true, data: data };
    }
  } catch (error) {
    console.log("Fetch Post Error: ", error);
    return { success: false, msg: "Could Not Fetch Posts" };
  }
};

export const createPostLike = async (postLike) => {
  // console.log("Initial post: ", post);
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      console.log("Post Like Error: ", error);
      return { success: false, msg: "Could Not Like the Posts" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Post Like Error: ", error);
    return { success: false, msg: "Could Not Like the Posts" };
  }
};
export const removePostLike = async (postId, userId) => {
  // console.log("Initial post: ", post);
  try {
    const { error } = await supabase
      .from("postLikes")
      .delete()
      .eq("userId", userId)
      .eq("postId", postId);

    if (error) {
      console.log("Post Like Error: ", error);
      return { success: false, msg: "Could Not remove the Posts like" };
    }

    return { success: true };
  } catch (error) {
    console.log("Post Like Error: ", error);
    return { success: false, msg: "Could Not remove the Posts like" };
  }
};
export const fetchPostDetails = async (postId) => {
  // console.log("Initial post: ", post);
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `*, user: users(id, name, image), postLikes(*), comments(*, user: users(id,name,image))`
      )
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "comments" })
      .single();

    if (error) {
      console.log("Fetch Post Details Error: ", error);
      return { success: false, msg: "Could Not Fetch the Post" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Fetch Post Details Error: ", error);
    return { success: false, msg: "Could Not Fetch the Post" };
  }
};

export const createComment = async (comment) => {
  // console.log("Initial post: ", post);
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select()
      .single();

    if (error) {
      console.log("Comment Error: ", error);
      return { success: false, msg: "Could Not Comment to the Posts" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Comment Error: ", error);
    return { success: false, msg: "Could Not Comment to the Posts" };
  }
};
export const removeComment = async (commentId) => {
  // console.log("Initial post: ", post);
  try {
    const { error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.log("removeComment Error: ", error);
      return { success: false, msg: "Could Not remove the Posts Comment" };
    }
    return { success: true, data: { commentId } };

    return { success: true };
  } catch (error) {
    console.log("removeComment Error: ", error);
    return { success: false, msg: "Could Not remove the Posts Comment" };
  }
};

export const removePost = async (postId) => {
  // console.log("Initial post: ", post);
  try {
    const { error } = await supabase.from("posts").delete().eq("id", postId);

    if (error) {
      console.log("removePostt Error: ", error);
      return { success: false, msg: "Could Not remove the Posts" };
    }
    return { success: true, data: { postId } };

    return { success: true };
  } catch (error) {
    console.log("removePost Error: ", error);
    return { success: false, msg: "Could Not remove the Posts" };
  }
};
