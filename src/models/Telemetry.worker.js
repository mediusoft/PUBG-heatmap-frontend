import parseTelemetry from "./Telemetry.parser";

export const TelemetryWorker = async ({ match, focusedPlayer }) => {
  try {
    console.log("match", match, focusedPlayer);
    const res = await fetch(match.telemetryUrl);
    const telemetryData = await res.json();
    console.log("teelmetryworker", telemetryData);
    const { state, globalState } = parseTelemetry(match, telemetryData, focusedPlayer);
    return { success: true, state, globalState, rawTelemetry: telemetryData };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
