import React, { useState } from "react";

const MeetingRoom = () => {
  const [layout, setLayout] = useState<"grid" | "speaker">("speaker");
  return <div>MeetingRoom : 2:26:02</div>;
};

export default MeetingRoom;
