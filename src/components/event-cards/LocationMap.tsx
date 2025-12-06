import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import type { EventLatLong } from "../../types";

interface LocationMapProps {
  eventLatLong: EventLatLong;
}

const LocationMap = ({ eventLatLong }: LocationMapProps) => {
  return (
      <div className='bg-background-secondary-light rounded-3xl p-6 mt-5 shadow-lg border border-gray-100 mb-6'>
          <h3 className='text-lg font-bold text-gray-900 mb-4 flex items-center'>
              <span className='w-1 h-6 bg-primary rounded-full mr-3' />
              Location
          </h3>
          <div className='h-64 w-full bg-gray-200 rounded-lg mt-2'>
            <MapContainer center={[eventLatLong.latitude, eventLatLong.longitude]} zoom={13} className="h-full w-full">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[eventLatLong.latitude, eventLatLong.longitude]}>
                <Popup>
                  {eventLatLong.address}
                </Popup>
              </Marker>
            </MapContainer>

          </div>
      </div>

  )
}

export default LocationMap
