import { NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import {authOptions} from '@/app/auth/auth'; 

const zoomClientID = process.env.ZOOM_CLIENT_ID;
const zoomClientSecret = process.env.ZOOM_CLIENT_SECRET;
const accountId = process.env.ZOOM_ACCOUNT_ID;

async function getZoomAccessToken(){
  try {
    const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    // }
    const params = new URLSearchParams();
    params.append("grant_type", "account_credentials");
    params.append("account_id", accountId!);

    const credentials = Buffer.from(`${zoomClientID}:${zoomClientSecret}`).toString("base64");


    const response = await axios.post("https://zoom.us/oauth/token", params, {
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    if (response.data.access_token) {
   
      return response.data.access_token;
    } else {
      console.error("No access token in response:", response.data);
      return null;
    }
  } catch (error: any) {
    console.error("Detailed token error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });
    return null;
  }
}

export async function POST() {
  try {
    
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }
    const accessToken = await getZoomAccessToken();
    if (!accessToken) {
      return NextResponse.json({ error: "Unable to retrieve access token" }, { status: 500 });
    }

    const meetingResponse = await axios.post(
      "https://api.zoom.us/v2/users/me/meetings",
      {
        topic: "Zoom metting",
        type: 1,
        settings: {
          host_video: true,
          participant_video: true,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      success: true,
      meeting: meetingResponse.data,
    });
  } catch (error: any) {
    console.error("Detailed meeting creation error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    });

    return NextResponse.json(
      {
        error: "Error creating meeting",
        details: error.response?.data || error.message,
      },
      {
        status: error.response?.status || 500,
      }
    );
  }
}
