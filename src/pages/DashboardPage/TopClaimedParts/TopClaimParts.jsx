import React, { useEffect, useState } from 'react';
import './TopClaimParts.css';
import { FaSyncAlt } from 'react-icons/fa'; // Import the toggle icon from react-icons/fa
import ToggleSwitch from '../../../components/ToggleSwitch';
import { FilterIcon } from '../../../Constant/ImageConstant';

const TopClaimParts = ({ topParts, filteredParts,appliedFiltered ,handleOpenModal}) => {

   
  
    const [isFlipped, setIsFlipped] = useState(false);
    useEffect(() => {
        if (appliedFiltered !== null) {
            setIsFlipped(true);
        }
    }, [appliedFiltered]);

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
        const result = [];
    
        sortedTopParts.slice(0, 5).forEach((part, index) => {
            const filteredPart = filteredParts.find(fp => fp.part_id === part.part_id);
    
            if (filteredPart) {
                result.push(
                    <div key={part.part_id} className="container">
                        <div className="card-container ">
                            <div className="card flip" style={{ backgroundColor: '#fdecea' }}>
                                <p className="part-name">{index+1}: {filteredPart?.part_description} ({filteredPart?.model})</p>
                                <p className="claim-count">{filteredPart.claimed_count}</p>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    
        while (result.length < 5) {
            result.push(
                <div key={`empty-${result.length}`} className="container">
                    <div className="card-container ">
                        <div className="card flip" style={{ backgroundColor: '#fdecea' }}>
                            <p className="part-name">No Data Found / No Filtered Applied</p>
                        </div>
                    </div>
                </div>
            );
        }
    
        return result;
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
             <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',width:'100%'}}>
            <h2>Top 5 Claimed Parts</h2>

            <div>

           
            </div>
           <div style={{display:'flex',alignItems:'center',gap:'15px'}}>
            <ToggleSwitch isChecked={isFlipped} onChange={toggleFlip} />

      <img src={FilterIcon} onClick={handleOpenModal} style={{height:'25px',width:'25px',cursor:'pointer'}}/>

</div>

</div>

            {isFlipped
                ? filteredParts.length === 0&& appliedFiltered===null
                    ? renderEmptyContainers()
                    : renderFilteredParts()
                : renderTopParts()}
        </div>
    );
};

export default TopClaimParts;
