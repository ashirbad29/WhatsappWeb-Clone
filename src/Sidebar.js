import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import { Chat, DonutLarge, MoreVert, SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import db from './firebase';
import { useStateValue } from './StateProvider';

export default function Sidebar() {
	const [rooms, setRooms] = useState([]);
	const [{ user }] = useStateValue();

	useEffect(() => {
		db.collection('rooms').onSnapshot(snapshot => {
			setRooms(
				snapshot.docs.map(doc => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});
	}, []);
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src={user?.photoURL} />
				<div className="sidebar__headerRight">
					<IconButton>
						<DonutLarge />
					</IconButton>

					<IconButton>
						<Chat />
					</IconButton>

					<IconButton>
						<MoreVert />
					</IconButton>
				</div>
			</div>

			<div className="sidebar__search">
				<div className="siderbar__searchContainer">
					<SearchOutlined />
					<input placeholder="search or start new chat" type="text" />
				</div>
			</div>

			<div className="sidebar__chats">
				<SidebarChat addNewChat={true} />
				{rooms.map(room => (
					<SidebarChat key={room.id} id={room.id} name={room.data.name} />
				))}
			</div>
		</div>
	);
}
