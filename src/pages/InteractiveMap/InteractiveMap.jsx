// src/pages/InteractiveMap/InteractiveMap.jsx
import React, { useEffect, useState, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import MapMarker from './components/MapMarker';
import MapInfoPanel from './components/MapInfoPanel';
import MapControls from './components/MapControls';
import { regions } from './data/mapData';
import worldMapImage from '../../assets/images/map/world_map.png';
import './InteractiveMap.css';
import '../Showcase/Showcase.css';

function InteractiveMap() {
    const [selectedRegion, setSelectedRegion] = useState(null);
    const transformRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleMarkerClick = (region) => {
        setSelectedRegion(region);
        zoomToRegion(region.id);
    };

    const handlePanelClose = () => {
        setSelectedRegion(null);
        if (transformRef.current) {
            transformRef.current.resetTransform(); // Zooms out to default view
        }
    };

    const zoomToRegion = (regionId) => {
        if (transformRef.current) {
            const { zoomToElement } = transformRef.current;
            // The third argument is the zoom scale (e.g., 2 = 200% zoom), the fourth is animation time in ms.
            zoomToElement(`marker-${regionId}`, 2, 800);
            const region = regions.find(r => r.id === regionId);
            setSelectedRegion(region);
        }
    };

    return (
        <div className="showcase-section interactive-map-page">
            <div className="section-title-container">
                <h1 className="section-title">World Map</h1>
            </div>
            <div className="interactive-map-layout">
                <div className="map-container">
                    <TransformWrapper
                        ref={transformRef}
                        initialScale={1}
                        minScale={0.8}
                        limitToBounds={true}
                        doubleClick={{ disabled: true }}
                    >
                        {() => ( // MODIFIED: Removed unused zoomIn and zoomOut variables
                            <>
                                <MapControls
                                    regions={regions}
                                    onRegionSelect={zoomToRegion}
                                    activeRegionId={selectedRegion?.id}
                                />
                                <TransformComponent
                                    wrapperStyle={{ width: '100%', height: '100%' }}
                                    contentStyle={{ width: '100%', height: '100%' }}
                                >
                                    <div className="map-image-wrapper">
                                        <img src={worldMapImage} alt="World Map of Paved by the Fallen" className="world-map-image" />
                                        {regions.map(region => (
                                            <MapMarker
                                                key={region.id}
                                                region={region}
                                                onClick={handleMarkerClick}
                                                isActive={selectedRegion?.id === region.id}
                                            />
                                        ))}
                                    </div>
                                </TransformComponent>
                            </>
                        )}
                    </TransformWrapper>
                </div>
                <AnimatePresence>
                    {selectedRegion && (
                        <MapInfoPanel
                            region={selectedRegion}
                            onClose={handlePanelClose}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default InteractiveMap;