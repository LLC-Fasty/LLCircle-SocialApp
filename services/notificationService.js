import { supabase } from "../lib/supabase";

export const createNotification = async (notification) => {
  // console.log("Initial post: ", post);
  try {
    const { data, error } = await supabase
      .from("notifications")
      .insert(notification)
      .select()
      .single();

    if (error) {
      console.log("notification Error: ", error);
      return { success: false, msg: "Something is Wrong" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Post Like Error: ", error);
    return { success: false, msg: "Something is Wrong" };
  }
};

export const fetchNoticications = async (reciverId) => {
  // console.log("Initial post: ", post);
  try {
    const { data, error } = await supabase
      .from("notifications")
      .select(`*, sender: senderId(id, name, image)`)
      .eq("receiverId", reciverId)
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Fetch notifications Error1: ", error);
      return { success: false, msg: "Could Not Fetch the notifications" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("Fetch notifications Error2: ", error);
    return { success: false, msg: "Could Not Fetch the notifications" };
  }
};
