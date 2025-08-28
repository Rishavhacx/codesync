"use client";

import LoaderUI from "@/app/components/ui/LoaderUI";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import useGetCallById from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { useState } from "react";

function MeetingPage() {
    const { id } = useParams();
    const { isLoaded } = useUser();
    const stringId = typeof id === "string" ? id : Array.isArray(id) ? id[0] : "";
    const { call, isCallLoading } = useGetCallById(stringId);

    const [isSetupComplete, setIsSetupComplete] = useState(false);

    if (!isLoaded || isCallLoading) return <LoaderUI />;

    if (!call) {
        return (
            <div className="h-screen flex items-center justify-center">
                <p className="text-2xl font-semibold">Meeting not found</p>
            </div>
        );
    }

    return (
        <StreamCall call={call}>
            <StreamTheme>
                {!isSetupComplete ? (
                    <MeetingSetup onSetupComplete={() => setIsSetupComplete(true)} />
                ) : (
                    <MeetingRoom />
                )}
            </StreamTheme>
        </StreamCall>
    );
}
export default MeetingPage;
