import React, { useState } from 'react';
import './TopClaimParts.css';
import { FaSyncAlt } from 'react-icons/fa'; // Import the toggle icon from react-icons/fa

const TopClaimParts = ({ topParts, filteredParts,appliedFiltered }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    console.table(topParts)

    // Sort top parts by claimed count in descending order
    const sortedTopParts = topParts?.sort((a, b) => b.claimed_count - a.claimed_count);

    const toggleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    // Render top parts
    const renderTopParts = () => {
        return sortedTopParts.slice(0, 5).map((part, index) => (
            <div key={part.part_id} className="container">
                <div className="card-container flip">
                    <div className="card" style={{ backgroundColor: '#f5f6f9' }}>
                        <p className="part-name">{index + 1}: {part?.part_description} ({part?.model})</p>
                        <p className="claim-count">{part.claimed_count}</p>
                    </div>
                </div>
            </div>
        ));
    };

    // Render filtered parts
    const renderFilteredParts = () => {
        return sortedTopParts.slice(0, 5).map((part, index) => {
            // Find filtered part corresponding to the top part
            const filteredPart = filteredParts.find(fp => fp.part_id === part.part_id);
            return (
                <div key={part.part_id} className="container">
                    {filteredPart ? (
                        <div className="card-container ">
                            <div className="card flip" style={{ backgroundColor: '#fdecea' }}>
                            <p className="part-name">{index + 1}: {filteredPart?.part_description} ({filteredPart?.model})</p>
                                <p className="claim-count">{filteredPart.claimed_count}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="card-container ">
                            <div className="card flip" style={{ backgroundColor: '#fdecea' }}>
                            <p className="part-name">{index + 1}: {part?.part_description} ({part?.model})</p>
                                <p className="claim-count">{part.claimed_count}</p>
                            </div>
                        </div>
                    )}
                </div>
            );
        });
    };

    // Render empty containers with no data message if filteredParts is empty
    const renderEmptyContainers = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="container no-data">
                <div className="card-container">
                    <div className="card " style={{ backgroundColor: '#fdecea' }}>
                        <p className="no-data-message">No filters added or no data found</p>
                    </div>
                </div>
            </div>
        ));
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <FaSyncAlt className="toggle-icon" onClick={toggleFlip} />
            {isFlipped
                ? filteredParts.length === 0&& appliedFiltered===null
                    ? renderEmptyContainers()
                    : renderFilteredParts()
                : renderTopParts()}
        </div>
    );
};

export default TopClaimParts;
