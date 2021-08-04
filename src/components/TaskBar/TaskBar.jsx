import { GrWindows } from 'react-icons/gr';
import { VscClose, VscRss, VscSearch, VscTriangleUp, VscUnmute } from 'react-icons/vsc';
import { FaBatteryFull, FaCommentAlt } from 'react-icons/fa';

import Clock from '../Clock/Clock';
import { Strings } from '../../data.store';
import './TaskBar.scss';


const TaskBarAppInstances = ({ apps, programs, data, onIconClick, onInstanceClick, onCloseInstance }) => {

  const Instances = ({ instances }) => instances.map((instance, key) => (
    <div className='TaskBar-app-instances-item' key={key}
      onClick={() => onInstanceClick(instance)}>
      <span className='TaskBar-app-instances-item-title'>
        {data[instance].title}
      </span>
      <span className='TaskBar-app-instances-item-close' onClick={() => onCloseInstance(instance)}>
        <VscClose />
      </span>
    </div>
  ));

  const App = ({ app, onClick }) => {
    const instances = programs[app.id] || [];
    return (     
      <div title={app.name}
        className={'TaskBar-app' + (instances.length ? ' TaskBar-app-running' : '')}
        onClick={() => instances.length ? true : onClick(app)}>
        { app.icon() }
        <div className='TaskBar-app-instances'>
          <Instances instances={programs[app.id] || []} />
        </div>
      </div>
    )
  };

  return apps.map((app, i) => (
    <App key={i} app={app} onClick={onIconClick} />
  ));
};



const TaskBar = ({
  apps, programs, programsData, onIconClick, onMindowsClick, onInstanceClick, onCloseInstance
}) => {
  return (
    <div className='TaskBar'>
      <div className='TaskBar-left'>
        <div className='TaskBar-mindows-icon' onClick={onMindowsClick}>
          <GrWindows />
        </div>
        <div className='TaskBar-searchbar'>
          <div className='TaskBar-searchbar-pseudo'>
            <VscSearch />
            <span>{Strings.TASKBAR_SEARCH_PLACEHOLDER}</span>
          </div>
          <input type='text' required />
        </div>

        <TaskBarAppInstances
          apps={apps}
          programs={programs}
          data={programsData}
          onIconClick={onIconClick}
          onInstanceClick={onInstanceClick}
          onCloseInstance={onCloseInstance} />
      </div>

      <div className='TaskBar-right'>
        <div className='TaskBar-App'><VscTriangleUp /></div>
        <div className='TaskBar-App'><VscRss /></div>
        <div className='TaskBar-App'><FaBatteryFull /></div>
        <div className='TaskBar-App'><VscUnmute /></div>
        <div className='TaskBar-App'><FaCommentAlt /></div>
        <div className='TaskBar-App'><Clock /></div>
        <div className='TaskBar-App'>&nbsp;</div>
      </div>
    </div>
  );
}

export default TaskBar;