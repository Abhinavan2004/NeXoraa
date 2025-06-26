import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Language to country code mapping
const LANGUAGE_TO_FLAG = {
  english: "gb",
  spanish: "es",
  french: "fr",
  german: "de",
  mandarin: "cn",
  japanese: "jp",
  korean: "kr",
  hindi: "in",
  russian: "ru",
  portuguese: "pt",
  arabic: "sa",
  italian: "it",
  turkish: "tr",
  dutch: "nl",
};

const FriendCard = ({ friend, onSendFriendRequest, hasRequestSent = false }) => {
  const [isRequestSent, setIsRequestSent] = useState(hasRequestSent);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendRequest = async () => {
    if (onSendFriendRequest && !isRequestSent) {
      setIsLoading(true);
      try {
        await onSendFriendRequest(friend._id);
        setIsRequestSent(true);
      } catch (error) {
        console.error('Failed to send friend request:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="card w-full bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
      <div className="card-body p-6">
        
        {/* Header with Avatar and Basic Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img 
                src={friend.profilepic || "https://avatar.iran.liara.run/public/1"} 
                alt={friend.fullname || friend.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-base-content truncate">
              {friend.fullname || friend.name || 'Unknown User'}
            </h3>
            {friend.location && (
              <p className="text-sm text-base-content/70 flex items-center gap-1 mt-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {friend.location}
              </p>
            )}
          </div>
        </div>
        
        {/* Bio Section */}
        {friend.bio && (
          <div className="mb-4">
            <p className="text-sm text-base-content/80 leading-relaxed">
              {friend.bio}
            </p>
          </div>
        )}
        
        {/* Languages Section */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {friend.nativeLanguage && (
              <div className="badge badge-outline badge-lg gap-2">
                {getLanguageFlag(friend.nativeLanguage)}
                <span className="text-xs font-medium">Native: {friend.nativeLanguage}</span>
              </div>
            )}
            {friend.learningLanguage && (
              <div className="badge badge-primary badge-lg gap-2">
                {getLanguageFlag(friend.learningLanguage)}
                <span className="text-xs font-medium text-white">Learning: {friend.learningLanguage}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-actions justify-center gap-3">
          {onSendFriendRequest ? (
            isRequestSent ? (
              <button className="btn btn-success btn-wide gap-2" disabled>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Request Sent
              </button>
            ) : (
              <button 
                onClick={handleSendRequest}
                disabled={isLoading}
                className={`btn btn-primary btn-wide gap-2 ${isLoading ? 'loading' : ''}`}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                    Send Friend Request
                  </>
                )}
              </button>
            )
          ) : (
            <Link to={`/chat/${friend._id}`} className="btn btn-outline btn-wide gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Message
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img 
        src={`https://flagcdn.com/24x18/${countryCode}.png`} 
        alt={`${language} flag`}
        className="w-4 h-3 object-cover rounded-sm" 
      />
    );
  }
  return null;
}

export default FriendCard;