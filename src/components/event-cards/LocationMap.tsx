import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const LocationMap = () => {
  return (
    <div className='bg-background-secondary-light p-5 m-4 rounded-2xl shadow-soft -z-10'>
      <h3 className='text-sm font-bold'>Location Map</h3>
      <div className='h-64 w-full bg-gray-200 rounded-lg mt-2'>
        <MapContainer center={[18.9582, 72.8321]} zoom={13} className="h-full w-full">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[18.9582, 72.8321]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default LocationMap
