// src/pages/Showcase/components/CharactersSection/CharactersSection.jsx
import React, { useState } from "react";
import { Card, Modal } from "antd";
import { charactersData } from "../../data/charactersData";
import "./CharactersSection.css";
import CharacterModal from "./CharacterModal/CharacterModal";

const CharactersSection = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [characterData, setCharacterData] = useState({});

    const onClickProfile = (character) => {
        setIsModalVisible(true);
        setCharacterData(character);
    };

    const onCancelProfileModal = () => {
        setIsModalVisible(false);
        setCharacterData({});
    };

    return (
        <div className="flex gap-8px character-section">
            {charactersData.map((o, index) => {
                return (
                    <Card
                        key={index}
                        hoverable // Added for better user feedback on hover
                        cover={
                            <img
                                alt="profile"
                                src={o.thumbnail}
                                className="character-card"
                            />
                        }
                        onClick={() => {
                            onClickProfile(o);
                        }}
                    >
                        <div className="character-card-name">{o.name}</div>
                    </Card>
                );
            })}
            <Modal
                open={isModalVisible}
                onCancel={onCancelProfileModal} // Simplified syntax
                className="character-modal"
                closeIcon={false}
                footer={null} // Use null for no footer in modern antd
                centered // Good practice: centers the modal vertically
            >
                <CharacterModal characterData={characterData} />
            </Modal>
        </div>
    );
};

export default CharactersSection;