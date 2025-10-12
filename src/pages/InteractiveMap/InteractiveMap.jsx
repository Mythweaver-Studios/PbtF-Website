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

    const handleRegionSelection = (regionId) => {
        // If the clicked region is already selected, deselect it.
        if (selectedRegion?.id === regionId) {
            setSelectedRegion(null);
            if (transformRef.current) {
                // MODIFIED: Added 800ms duration for a smoother zoom-out.
                transformRef.current.resetTransform(800);
            }
        } else {
            // Otherwise, select the new region and zoom to it.
            if (transformRef.current) {
                const { zoomToElement } = transformRef.current;
                zoomToElement(`marker-${regionId}`, 2, 800);
                const region = regions.find(r => r.id === regionId);
                setSelectedRegion(region);
            }
        }
    };

    const handleMarkerClick = (region) => {
        handleRegionSelection(region.id);
    };

    const handlePanelClose = () => {
        // The close button's action is equivalent to deselecting the current region.
        handleRegionSelection(selectedRegion?.id);
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
                        {() => (
                            <>
                                <MapControls
                                    regions={regions}
                                    onRegionSelect={handleRegionSelection}
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