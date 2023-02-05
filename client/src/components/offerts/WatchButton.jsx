import { BookmarkIcon as BookmarkIconOutline } from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { Button } from '@vechaiui/react';
import React, { useState } from 'react';
import { watchOfferts } from '../../utils/watchOfferst.service';

const WatchButton = ({id}) => {
  const [watch, setWatch] = useState(watchOfferts.isWatched(id));

  function handleObserve() {
    if(watch) {
      watchOfferts.remove(id)
    } else {
      watchOfferts.add(id)
    }
    setWatch(!watch)
  }

  return (
    <div>
      {!watch ? (
        <Button 
          onClick={handleObserve}
          variant='outline'
          color="indigo"
          rightIcon={<BookmarkIconOutline className='w-4 h-4 ml-2' />}
        >
          Obserwuj
        </Button>
      )
      : (
        <Button 
          onClick={handleObserve}
          variant='solid'
          color="indigo"
          rightIcon={<BookmarkIconSolid className='w-4 h-4 ml-2' />}
        >
          Obserwowane
        </Button>
      ) 
    }
  </div>
  )
}

export default WatchButton