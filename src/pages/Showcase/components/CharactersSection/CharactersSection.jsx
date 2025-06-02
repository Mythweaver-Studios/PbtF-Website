import React, { useState } from "react";
import Card from "antd/es/card/Card";
import { charactersData } from "../../data/charactersData";
import "./CharactersSection.scss";
import { Modal } from "antd";
import CharacterModal from "./CharacterModal/CharacterModal";

const CharactersSection = () => {

    const [ isModalVisible, setIsModalVisible ] = useState(false);
    const [ characterData, setCharacterData ] = useState({});

    const onClickProfile = (character) => {
        setIsModalVisible(true);
        setCharacterData(character);
    }

    const onCancelProfileModal = () => {
        setIsModalVisible(false);
        setCharacterData({});
    }

    return (
        <div className="flex gap-8px character-section">
            {charactersData.map((o, index) => {
                return (
                    <Card
                        key={index}
                        cover={
                            <img
                                alt="profile"
                                src={o.thumbnail}
                                className="character-card"
                            />
                        }
                        onClick={() => {
                            onClickProfile(o)
                        }}
                    >
                        <div className="character-card-name">{o.name}</div>
                    </Card>
                );
            })}
            <Modal
                open={isModalVisible}
                onCancel={() => {
                    onCancelProfileModal()
                }}
                className="character-modal"
                closeIcon={false}
                footer={false}
                >
                    <CharacterModal characterData={characterData}/>
            </Modal>
        </div>
    );
};

export default CharactersSection;
