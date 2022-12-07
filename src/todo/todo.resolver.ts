import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput } from './dto/inputs/create-todo.input';
import { UpdateTodoInput } from './dto/inputs/update-todo.input';

//The Resolver decorator is equal to Controller in rest full api
@Resolver()
export class TodoResolver {

    constructor(
        private readonly todoService: TodoService,
    ){}

    @Query( () => [ Todo ], { name: 'todos' } )
    findAll(): Todo[] {
        return this.todoService.findAll();
    }

    @Query( () => Todo, { name: 'todo' } )
    findOne( @Args('id', { type: () => Int } ) id: number ): Todo {
        return this.todoService.findOne(id);
    }

    @Mutation( () => Todo, { name: 'createTodo' } )
    createTodo( @Args('createTodoInput') createTodoInput: CreateTodoInput ): Todo {
        return this.todoService.create( createTodoInput )
    }

    @Mutation( () => Todo, { name: 'updateTodo' } )
    updateTodo( @Args('updateTodoInput') updateTodoInput: UpdateTodoInput ): Todo {
        return this.todoService.update( updateTodoInput );
    }

    // @Mutation()
    // deleteTodo() {
        
    // }

}
