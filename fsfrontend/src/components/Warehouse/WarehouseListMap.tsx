import { useGeocodeAddress } from "@/hooks/useGeocodeAddress";
import { useEffect, useRef } from "react";
import L from "leaflet";
import { Warehouse } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const createWarehousePinIcon = () =>
  new L.DivIcon({
    className: "", // optional for global styles
    html: renderToStaticMarkup(
      <div style={{ position: "relative", width: 20, height: 26 }}>
        <div
          style={{
            width: 20,
            height: 20,
            backgroundColor: "#dc2626", // Tailwind red-600
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          <Warehouse size={12} color="white" />
        </div>
        <div
          style={{
            width: 2,
            height: 2,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: "6px solid #dc2626",
            position: "absolute",
            left: 4,
            top: 20,
          }}
        />
      </div>
    ),
    iconSize: [20, 26],
    iconAnchor: [10, 26], // bottom center
  });

export const WarehouseListMap = ({
  address,
}: {
  index: number;
  address: string;
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { data } = useGeocodeAddress(address);

  useEffect(() => {
    if (!data || !containerRef.current) return;

    const lat = parseFloat(data.lat);
    const lng = parseFloat(data.lon);

    if (!mapRef.current) {
      mapRef.current = L.map(containerRef.current, {
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
      });
      L.marker({ lat, lng })
        .setIcon(createWarehousePinIcon())
        .addTo(mapRef.current);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapRef.current);
    }

    // 🧠 Update the view (even on remount)
    mapRef.current.setView([lat, lng], 16);
  }, [data]);

  return (
    <div
      ref={containerRef}
      className="w-full z-0 rounded overflow-hidden"
      style={{ height: "180px" }}
    />
  );
};
