import React from 'react';
// import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="pagination">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {[...Array(totalPages).keys()].map(number => (
                <button 
                    key={number + 1} 
                    onClick={() => onPageChange(number + 1)}
                    className={currentPage === number + 1 ? 'active' : ''}
                >
                    {number + 1}
                </button>
            ))}
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;