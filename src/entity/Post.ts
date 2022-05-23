enum PostType {
  TASK = "task",
  AUCTION = "auction",
  BOUNTY = "bounty",
}

interface IPost {
  user: User;
  type: PostType;
  name: string;
  deadline: Date;
  sendNotification: () => void;
}

class Task implements IPost {
  private _user: User;
  private _type: PostType;
  private _name: string;
  private _deadline: Date;

  constructor(obj: any) {
    this._user = obj.user;
    this._type = obj.type;
    this._name = obj.name;
    this._deadline = obj.deadline;
  }

  sendNotification() {
    console.log("send task notification");
  }

  /**
   * Getter user
   * @return {User}
   */
  public get user(): User {
    return this._user;
  }

  /**
   * Getter type
   * @return {PostType}
   */
  public get type(): PostType {
    return this._type;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter deadline
   * @return {Date}
   */
  public get deadline(): Date {
    return this._deadline;
  }

  /**
   * Setter user
   * @param {User} value
   */
  public set user(value: User) {
    this._user = value;
  }

  /**
   * Setter type
   * @param {PostType} value
   */
  public set type(value: PostType) {
    this._type = value;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter deadline
   * @param {Date} value
   */
  public set deadline(value: Date) {
    this._deadline = value;
  }
}

class Auction implements IPost {
  private _user: User;
  private _type: PostType;
  private _name: string;
  private _deadline: Date;

  constructor(obj: any) {
    this._user = obj.user;
    this._type = obj.type;
    this._name = obj.name;
    this._deadline = obj.deadline;
  }

  sendNotification() {
    console.log("send auction notification");
  }

  /**
   * Getter user
   * @return {User}
   */
  public get user(): User {
    return this._user;
  }

  /**
   * Getter type
   * @return {PostType}
   */
  public get type(): PostType {
    return this._type;
  }

  /**
   * Getter name
   * @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Getter deadline
   * @return {Date}
   */
  public get deadline(): Date {
    return this._deadline;
  }

  /**
   * Setter user
   * @param {User} value
   */
  public set user(value: User) {
    this._user = value;
  }

  /**
   * Setter type
   * @param {PostType} value
   */
  public set type(value: PostType) {
    this._type = value;
  }

  /**
   * Setter name
   * @param {string} value
   */
  public set name(value: string) {
    this._name = value;
  }

  /**
   * Setter deadline
   * @param {Date} value
   */
  public set deadline(value: Date) {
    this._deadline = value;
  }
}

const auction = new Auction({});

function a(post: IPost) {
  post.sendNotification();
}

function controller(req, res, next) {
  const auction = new Auction(req);
  switch (req.type) {
    case PostType.AUCTION:
      console.log("auction");
    case PostType.AUCTION:
  }
}
interface IPostService {
  createBid: () => void;
}

class TaskService implements IPostService {
  createBid;
}
