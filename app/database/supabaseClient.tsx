import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://tcnbkcymtbenqtrdbutr.supabase.co";
const supabaseAnonKey = "sb_publishable_wmspJ7wu_8qSlOp8MwfRiQ_X8cfHAz1";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
