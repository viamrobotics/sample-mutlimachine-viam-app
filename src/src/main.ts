import * as VIAM from "@viamrobotics/sdk";
import Cookies from "js-cookie";
import { fragmentID,robotListDivName, userTokenCookieName } from "./constants";

document.addEventListener("DOMContentLoaded", async () => {
  const {access_token: accessToken} = JSON.parse(Cookies.get(userTokenCookieName)!);
  const viamClient = await connect(accessToken);
    
  const locationSummaries = await viamClient.appClient.listMachineSummaries("", [fragmentID]);
  
  const robotListDiv: HTMLElement | null = document.getElementById(robotListDivName);

  if (robotListDiv){
    for (let i = 0; i < locationSummaries.length, i++;) {
      const location = document.createElement("h2");
      location.textContent = `${locationSummaries[i].locationName} (ID: ${locationSummaries[i].locationId})`;
      
      robotListDiv.appendChild(location);

      for (let j = 0; j < locationSummaries[i].machineSummaries.length; j++) {
        const machineSummary = locationSummaries[i].machineSummaries[j];
        const machine = document.createElement("p");
        machine.innerText = `${machineSummary.machineName} (ID: ${machineSummary.machineId})`;

        robotListDiv.appendChild(machine);
      }
    }
  }
});

async function connect(accessToken: string): Promise<VIAM.ViamClient> {
  const opts: VIAM.ViamClientOptions = {
    serviceHost: "https://app.viam.dev",
    credentials: {
      type: "access-token",
      payload: accessToken,
    },
  };

  return await VIAM.createViamClient(opts);
}
